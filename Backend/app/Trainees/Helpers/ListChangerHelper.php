<?php

namespace App\Trainees\Helpers;

use Carbon\Carbon;

trait ListChangerHelper
{
    protected function listChanger($trainee, $class)
    {
        if ($trainee->current_list !== $class->List($class->list)->id) {
            // Get the source list name before changing
            $sourceListId = $trainee->current_list;
            $sourceListName = $this->getListNameById($sourceListId);

            $trainee->pervious_list = $trainee->current_list;

            $trainee->current_list = $class->List($class->list)->id;

            $trainee->moved_date = Carbon::now();

            $trainee->save();

            return response(['message' => "Trainee moved to " . $class?->list_name . " successfully."], 201);
        }

        return response(['message' => "Trainee is already in " . $class?->list_name . "."], 400);
    }

    /**
     * Get list name by ID for  clearing
     */
    private function getListNameById($listId)
    {
        $listMap = [
            // You may need to adjust these IDs based on your database
            'Wait List' => 'waitlist',
            'Pending List' => 'pendinglist',
            'Hold List' => 'holdlist',
            'Refund List' => 'refundlist',
            'Blacklist' => 'blacklist',
        ];

        // Try to get the list from database
        $list = \App\Models\GtList::find($listId);

        if ($list && isset($listMap[$list->list_title])) {
            return $listMap[$list->list_title];
        }

        return null;
    }
}
