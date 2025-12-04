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
        Schema::create('gt_trainee_metas', function (Blueprint $table) {
            $table->bigIncrements('id')->from(2423);
            $table->bigInteger('trainee_id')->unsigned();
            $table->foreign('trainee_id')->references('id')->on('gt_trainees')->onDelete('cascade');
            $table->string('meta_key');
            $table->text('meta_value');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gt_trainee_metas');
    }
};
