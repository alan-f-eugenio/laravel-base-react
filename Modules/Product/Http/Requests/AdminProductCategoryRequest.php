<?php

namespace Modules\Product\Http\Requests;

use App\Helpers\DefaultStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Modules\Product\Entities\ProductCategory;
use Modules\Product\Http\Controllers\AdminProductCategoryController;

class AdminProductCategoryRequest extends FormRequest {
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
            //
            'status' => ['required', new Enum(DefaultStatus::class)],
            'id_parent' => ['nullable', $this->product_category ? Rule::notIn(AdminProductCategoryController::recursiveCategoryChild($this->product_category, [])) : ''],
            'name' => 'required|string|max:255',
            'page_title' => 'nullable|string|max:255',
            'meta_keywords' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
            'text' => 'nullable|string',
            'filename' => 'sometimes|image|max:5120',
            'ordem' => 'required|integer',
        ];
    }

    public function messages(): array {
        return [
            'id_parent' => 'Categoria Pai inválida',
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {
        return true;
    }

    protected function prepareForValidation(): void {
        $lastProductCategory = ProductCategory::where('id_parent', $this->id_parent ?: null)->orderBy('ordem', 'desc')->first();
        $this->merge([
            'id_parent' => $this->id_parent ?: null,
            'ordem' => $this->product_category?->ordem ?: ($lastProductCategory ? $lastProductCategory->ordem + 1 : 1)
        ]);
    }
}
