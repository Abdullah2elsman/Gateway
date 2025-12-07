<?php

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
        Schema::table('gt_trainees', function (Blueprint $table) {
            // First, check if there's an existing foreign key and drop it
            // This is safe because we're recreating it with the correct behavior
            $table->dropForeign(['level']);

            // Add foreign key with ON DELETE SET NULL
            // This means: when a level is deleted from gt_generalmeta,
            // set the trainee's level to NULL instead of deleting the trainee
            $table->foreign('level')
                ->references('id')
                ->on('gt_generalmeta')
                ->onDelete('set null')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('gt_trainees', function (Blueprint $table) {
            // Remove the foreign key constraint
            $table->dropForeign(['level']);
        });
    }
};
