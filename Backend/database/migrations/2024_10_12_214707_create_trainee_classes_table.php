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
        Schema::create('gt_trainee_classes', function (Blueprint $table) {
            $table->bigIncrements('id')->from(2423);
            $table->bigInteger('user_id')->unsigned()->nullable();
            $table->foreign('user_id')->references('id')->on('gt_users');
            $table->bigInteger('class_id')->unsigned()->nullable();
            $table->foreign('class_id')->references('id')->on('gt_classes')->onUpdate('cascade')->onDelete('cascade');
            $table->bigInteger('trainee_id')->unsigned()->nullable();
            $table->foreign('trainee_id')->references('id')->on('gt_trainees')->onDelete('cascade');
            $table->boolean('confirmation')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gt_trainee_classes');
    }
};