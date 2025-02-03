<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::factory()->create(
            [
                'name' => 'Product 1',
                'description' => 'Description 1',
                'price' => 10.99,
                'image' => 'https://picsum.photos/200/300',
                'user_id' => 2
            ]
        );
        Product::factory(50)->create();
    }
}
