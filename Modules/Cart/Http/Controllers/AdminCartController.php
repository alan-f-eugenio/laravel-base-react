<?php

namespace Modules\Cart\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Cart\Entities\Cart;

class AdminCartController extends Controller {
    public function index(Request $request) {
        $query = Cart::orderBy('updated_at', 'desc')->has('cartProducts');

        $request->whenFilled('has_customer', function ($value) use ($query) {
            if ($value == 1) {
                $query->whereNotNull('customer_id');
            } else {
                $query->whereNull('customer_id');
            }
        });

        $request->whenFilled('name', function ($value) use ($query) {
            $query->whereHas('customer', function (Builder $query) use ($value) {
                $query->where('fullname', 'LIKE', "%{$value}%");
            });
        });

        $request->whenFilled('date', function ($value) use ($query) {
            if (strtotime($value) <= strtotime(Carbon::now()->subDay(1)->toDateString())) {
                $query->whereDate('updated_at', $value);
            }
        });

        return Inertia::render(
            'Cart::Admin/Index',
            ['collection' => $query->with([
                'cartProducts',
                'customer'
            ])->paginate(10)->withQueryString()]
        );
    }

    public function destroy(Cart $cart) {
        $cart->update(['update_user_id' => auth('admin')->id()]);
        $cart->delete();

        return redirect()->route('admin.carts.index')->with('message', ['type' => 'success', 'text' => 'Carrinho removido com sucesso.']);
    }
}
