<?php

namespace Modules\Coupon\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Coupon\Entities\Coupon;
use Modules\Coupon\Helpers\CouponDiscountTypes;
use Modules\Coupon\Http\Requests\AdminCouponRequest;

class AdminCouponController extends Controller {
    public function index(Request $request) {
        $query = Coupon::orderBy('id', 'desc');

        $request->whenFilled('status', function ($value) use ($query) {
            $query->where('status', $value);
        });
        $request->whenFilled('token', function ($value) use ($query) {
            $query->where('token', 'LIKE', "%{$value}%");
        });
        $request->whenFilled('discount_type', function ($value) use ($query) {
            $query->where('discount_type', $value);
        });

        $couponDiscountTypes = CouponDiscountTypes::array();

        return Inertia::render(
            'Coupon::Admin/Index',
            ['collection' => $query->paginate(10)->withQueryString(), 'couponDiscountTypes' => $couponDiscountTypes]
        );
    }

    public function create() {
        $item = new Coupon;
        $couponDiscountTypes = CouponDiscountTypes::array();

        return Inertia::render(
            'Coupon::Admin/CreateEdit',
            [
                'item' => $item,
                'couponDiscountTypes' => $couponDiscountTypes,
            ]
        );
    }

    public function store(AdminCouponRequest $request) {
        $attributes = $request->validated();

        $attributes['create_user_id'] = auth('admin')->id();

        Coupon::create($attributes);

        return redirect()->route('admin.coupons.index')->with('message', ['type' => 'success', 'text' => 'Cupom cadastrado com sucesso.']);
    }

    public function edit(Coupon $coupon) {
        $couponDiscountTypes = CouponDiscountTypes::array();

        return Inertia::render(
            'Coupon::Admin/CreateEdit',
            [
                'item' => $coupon,
                'couponDiscountTypes' => $couponDiscountTypes,
            ]
        );
    }

    public function update(AdminCouponRequest $request, Coupon $coupon) {
        $attributes = $request->validated();

        $attributes['update_user_id'] = auth('admin')->id();

        $coupon->update($attributes);

        return redirect()->route('admin.coupons.edit', $coupon)->with('message', ['type' => 'success', 'text' => 'Cupom alterado com sucesso.']);
    }

    public function destroy(Coupon $coupon) {
        $coupon->update(['update_user_id' => auth('admin')->id()]);
        $coupon->delete();

        return redirect()->route('admin.coupons.index')->with('message', ['type' => 'success', 'text' => 'Cupom removido com sucesso.']);
    }
}
