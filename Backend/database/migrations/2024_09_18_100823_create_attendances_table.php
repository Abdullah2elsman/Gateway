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
        Schema::create('gt_attendance', function (Blueprint $table) {
            $table->bigIncrements('id')->from(2423);
            $table->bigInteger('class_id')->unsigned();
            $table->foreign('class_id')->references('id')->on('gt_classes')->onDelete('cascade');
            $table->bigInteger('trainee_id')->unsigned();
            $table->foreign('trainee_id')->references('id')->on('gt_trainees')->onDelete('cascade');
            $table->string('admin_note')->nullable();
            $table->string('trainer_note')->nullable();
            $table->string('result')->nullable();
            $table->string('comment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gt_attendance');
    }
};