<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTodoTable extends Migration
{

    public function up()
    {
        Schema::create('todos', function ($table) {
            $table->increments('id');
            $table->string('description', 100);
            $table->boolean('is_done');
            $table->integer('owner_id');
            $table->date('created_at');
            $table->date('updated_at');
        });

    }

    public function down()
    {
        Schema::drop('todos');
    }
}
