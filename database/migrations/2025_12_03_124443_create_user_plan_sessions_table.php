<?php

use App\Models\PlanSession;
use App\Models\UserPlan;
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
        Schema::create('user_plan_sessions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignIdFor(PlanSession::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(UserPlan::class)->constrained()->cascadeOnDelete();
            $table->boolean('complete')->default(false);
            $table->float('progress')->default(0.0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_plan_sessions');
    }
};
