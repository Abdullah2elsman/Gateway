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
        Schema::create('gt_session_notes', function (Blueprint $table) {
            $table->bigIncrements('id')->from(2423);
            $table->bigInteger('attend_id')->unsigned();
            $table->foreign('attend_id')->references('id')->on('gt_attendance')->onDelete('cascade');
            $table->string('session_title');
            $table->boolean('session_status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gt_session_notes');
    }
};
