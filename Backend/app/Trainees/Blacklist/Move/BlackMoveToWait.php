<?php

namespace App\Trainees\Blacklist\Move;

use Exception;
use App\Models\Trainee;
use App\Traits\GetList;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;
use App\Trainees\Helpers\ListChangerHelper;

class BlackMoveToWait extends Permissions
{
    use ListChangerHelper, GetList, SendNotification;
    
    public function __construct(?Trainee $trainee, $id)
    {
        Gate::authorize('moveBlackToWait', $trainee->find($id));

        $this->list = 'Wait List';

        $this->list_name = 'wait list';

        $this->current_user = auth()->user();
    }

    public function move(?Trainee $trainee, $id)
    {
        try
        {   
            $message = $this->listChanger($trainee->find($id), $this);

            $this->notifyUser('has moved a trainee from blacklist to wait list', $this->current_user, 'move_trainee_from_black_to_wait');
            
            return $message;
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The trainee cannot be moved. Please contact the administrator of the website."], 400);
        }
    }
}