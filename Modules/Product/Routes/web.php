<?php

use Illuminate\Support\Facades\Route;
use Modules\Product\Http\Controllers\AdminProductAttributeController;
use Modules\Product\Http\Controllers\AdminProductAttributeOptController;
use Modules\Product\Http\Controllers\AdminProductCategoryController;
use Modules\Product\Http\Controllers\AdminProductController;
use Modules\Product\Http\Controllers\ProductController;

Route::get('produtos/{product_category:slug?}', [ProductController::class, 'index'])->name('products.index');
Route::get('produto/{product:slug}', [ProductController::class, 'show'])->name('products.show');

Route::prefix('admin')->middleware('auth:admin', 'auth.session')->group(function () {
    Route::resource('product_categories', AdminProductCategoryController::class)->except('show')->names('admin.product_categories');
    Route::put('product_categories_order', [AdminProductCategoryController::class, 'updateOrdenation'])->name('admin.product_categories_order');

    Route::resource('product_attributes', AdminProductAttributeController::class)->except('show')->names('admin.product_attributes');

    Route::get('product_attribute_opts', [AdminProductAttributeOptController::class, 'index'])->name('admin.product_attribute_opts.index');

    Route::resource('products', AdminProductController::class)->except('show')->names('admin.products');
    Route::get('productSearch', [AdminProductController::class, 'search'])->name('admin.products.search');
});
