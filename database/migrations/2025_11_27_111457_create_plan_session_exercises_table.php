<?php

use App\Models\Exercise;
use App\Models\PlanSession;
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
        Schema::create('plan_session_exercises', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->boolean('complete')->default(false);
            $table->integer('sets')->default(1);
            $table->integer('reps')->default(1);
            $table->float('duration')->default(5);
            $table->foreignIdFor(PlanSession::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Exercise::class)->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plan_session_exercises');
    }
};
