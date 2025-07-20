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
        Schema::create('poems', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Legătură cu utilizatorul
            $table->string('title'); // Titlul poeziei/textului
            $table->string('subtitle')->nullable(); // Subtitlul (optional)
            $table->enum('type', [ // Tipul textului (predefinit)
                'poezie',
                'proză',
                'eseu',
                'scenariu',
                'citate',
                'personale'
            ])->default('poezie');
            $table->text('content'); // Conținutul textului
            $table->unsignedInteger('views')->default(0); // Număr de vizualizări
            $table->timestamps(); // created_at și updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('poems');
    }
};
