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
        Schema::create('gt_annoncement_replies', function (Blueprint $table) {
            $table->bigIncrements('id')->from(2423);
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('gt_users');
            $table->bigInteger('announce_id')->unsigned();
            $table->foreign('announce_id')->references('id')->on('gt_annoncements')->onDelete('cascade');
            $table->text('reply');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gt_annoncement_replies');
    }
};