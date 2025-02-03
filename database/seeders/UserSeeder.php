<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com'
        ]);

        User::factory()->create([
            'name' => 'Test User 2',
            'email' => 'user@user.com',
            'password' => bcrypt('123456789'),
        ]);

        User::factory(8)->create();
    }
}
