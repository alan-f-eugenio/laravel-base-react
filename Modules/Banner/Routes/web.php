<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Route;
use Modules\Banner\Http\Controllers\AdminBannerController;

Route::prefix('admin')->middleware('auth:admin', 'auth.session')->group(function () {
    Route::resource('banners', AdminBannerController::class)->except('show')->names('admin.banners');
    Route::put('banners_order', [AdminBannerController::class, 'updateOrdenation'])->name('admin.banners_order');
});
