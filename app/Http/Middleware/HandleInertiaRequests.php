<?php

namespace App\Http\Middleware;

use App\Helpers\DefaultStatus;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Modules\Content\Helpers\ContentNavTypes;
use Nwidart\Modules\Facades\Module;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware {
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array {

        $modules = json_decode(file_get_contents('../modules_statuses.json'));
        $contentModule = isset($modules->Content) && $modules->Content == true;

        if ($contentModule) {
            $navs = \Modules\Content\Entities\ContentNav::orderBy('type')->get()->mapWithKeys(function ($item) {
                return [$item['slug'] => $item];
            });
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'commonData' => [
                'flash' => [
                    'message' => fn () => $request->session()->get('message')
                ],
                'activeModules' => array_keys(Module::getByStatus(1)),
                'contentNavs' => isset($navs) ? $navs : [],
                'contentNavTypes' => ContentNavTypes::array(),
                'defaultStatuses' => DefaultStatus::array()
            ]
        ]);
    }
}
