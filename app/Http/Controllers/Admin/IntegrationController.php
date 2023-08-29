<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\DefaultStatus;
use App\Http\Controllers\Controller;
use App\Models\Integration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IntegrationController extends Controller {
    /**
     * Show the form for editing the specified resource.
     */
    public function edit() {
        //
        $integrations = config('integrations') ?: [];
        $defaultStatuses = DefaultStatus::array();

        return Inertia::render(
            'Admin/Integration/Edit',
            ['item' => $integrations, 'defaultStatuses' => $defaultStatuses]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request) {
        //
        dd($request, $request->integration, $request->content);
        foreach ($request->integration as $id => $fields) {
            if ($integration = Integration::firstWhere('id', $id)) {
                $attributes = [
                    'id' => $id,
                    'update_user_id' => auth('admin')->id(),
                    'status' => $fields['status'],

                ];
                if (isset($fields['defines']) && $integration->editable) {
                    $attributes['defines'] = json_encode($fields['defines']);
                }
                $integration->update($attributes);
            }
        }

        return redirect()->route('admin.integrations.edit')->with('message', ['type' => 'success', 'text' => 'Integrações alteradas com sucesso.']);
    }
}
