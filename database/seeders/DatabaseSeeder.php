<?php

namespace Database\Seeders;

use App\Models\Exercise;
use App\Models\Plan;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $plans = [
            [
                "name" => "Fat Burning Starter Circuit",
                "description" => "This plan is perfect for those who are new to working out or looking to ease back into fitness. It’s designed to build a solid foundation by incorporating low-impact exercises, with a focus on fat burning and increasing stamina. You’ll work at your own pace, while still achieving great results.",
                "sessions_number" => 15,
                "image" => "https://www.puregym.com/media/rexoo3bz/four-20-minute-hiit-workouts_header.jpg?quality=80",
                "level" => "Beginner",
                "duration" => 45,
            ],
            [
                "name" => "Fat Burning Strength & Cardio Combo",
                "description" => "This plan targets individuals with a moderate fitness level looking to push their fat-burning potential. The workout combines strength training and cardio intervals to challenge the body and accelerate fat loss. It’s more intense than the beginner routine, but still modifiable based on your capabilities.",
                "sessions_number" => 7,
                "image" => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF3t5un_M8fbU4MDUjULE5tCIMCLAzvV7E3A&s",
                "level" => "Intermediate",
                "duration" => 30,
            ],
        ];

        User::factory()->create([
            'name' => 'ibrahimsar',
            'email' => 'brahim.sat151@gmail.com',
            'password' => 'brahim.sat151'
        ]);

        $exercises = [
            [
                'name' => 'Mountain Climber',
                'description' => 'Fast-paced core and cardio movement performed in plank position',
                'notes' => 'hips steady; avoid bouncing.',
                'image' => 'https://res.cloudinary.com/djgt4yl8m/image/upload/v1764271316/mountain-climbers_siw0zc.gif',
                'level' => 'Beginner'
            ],
            [
                'name' => 'Lunges',
                'description' => 'Alternating lunge exercise to strengthen legs and improve balance.',
                'notes' => 'Keep hips steady; avoid bouncing.',
                'image' => 'https://res.cloudinary.com/djgt4yl8m/image/upload/v1764271309/lunges_pwvat0.gif',
                'level' => 'Beginner'
            ],
            [
                'name' => 'Russian Twist',
                'description' => 'Rotational core exercise targeting obliques.',
                'notes' => 'Keep your spine tall; avoid rounding the back.',
                'image' => 'https://res.cloudinary.com/djgt4yl8m/image/upload/v1764266255/russian-twist_ptw9pt.gif',
                'level' => 'Intermediate'
            ]
        ];

        foreach ($exercises as $exercise) {
            Exercise::create($exercise);
        }

        // foreach ($plans as $plan) {
        //     Plan::create($plan);
        // }
    }
}
