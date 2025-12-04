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
        Schema::create('gt_classes', function (Blueprint $table) {
            $table->bigIncrements('id')->from(2423);
            $table->bigInteger('user_id')->unsigned()->nullable();
            $table->foreign('user_id')->references('id')->on('gt_users');
            $table->bigInteger('batch_id')->unsigned();
            $table->foreign('batch_id')->references('id')->on('gt_batches')->onDelete('cascade');
            $table->bigInteger('branch_id')->unsigned();
            $table->foreign('branch_id')->references('id')->on('gt_branches')->onUpdate('cascade');
            $table->bigInteger('trainer_id')->unsigned()->nullable();
            $table->foreign('trainer_id')->references('id')->on('gt_users');
            $table->string('class_name');
            $table->enum('class_type', ['Online', 'Offline', 'Hybrid', 'Private']); 
            $table->bigInteger('gate')->unsigned()->nullable();
            $table->foreign('gate')->references('id')->on('gt_classmeta')->onUpdate('cascade')->onDelete('cascade');           
            $table->bigInteger('time_slot')->unsigned()->nullable();
            $table->foreign('time_slot')->references('id')->on('gt_classmeta')->onUpdate('cascade')->onDelete('cascade');
            $table->bigInteger('level')->unsigned()->nullable();
            $table->foreign('level')->references('id')->on('gt_classmeta')->onUpdate('cascade')->onDelete('cascade'); 
            $table->string('gate_url')->nullable();
            $table->string('gate_password')->nullable();
            $table->timestamp('moved_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gt_classes');
    }
};