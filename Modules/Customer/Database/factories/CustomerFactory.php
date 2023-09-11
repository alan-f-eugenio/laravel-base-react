<?php

namespace Modules\Customer\Database\factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CustomerFactory extends Factory {
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = \Modules\Customer\Entities\Customer::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition() {
        $bool = fake()->boolean(75);

        $brFaker = \Faker\Factory::create('pt_BR');


        return [
            'person' => $bool ? 1 : 2,
            'fullname' => $bool ? fake()->name() : str(fake()->words(2, true))->title(),
            'cpf' => $brFaker->cpf,
            'rg' => $brFaker->rg,
            'date_birth' => fake()->dateTimeBetween('-100 years', '-18 years'),
            'cnpj' => !$bool ? $brFaker->cnpj : null,
            'corporate_name' => !$bool ? str(fake()->words(2, true))->title() : null,
            'state_registration' => !$bool ? fake()->numerify('###.#####-##') : null,
            'phone' => fake()->numerify('(##) 9####-####'),
            'email' => fake()->unique()->safeEmail(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ];
    }
}
