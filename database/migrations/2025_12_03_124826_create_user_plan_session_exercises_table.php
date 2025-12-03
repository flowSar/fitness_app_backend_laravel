<?php

use App\Models\PlanSessionExercise;
use App\Models\UserPlanSession;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_plan_session_exercises', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignIdFor(PlanSessionExercise::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(UserPlanSession::class)->constrained()->cascadeOnDelete();
            $table->boolean('complete')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_plan_session_exercises');
    }
};
