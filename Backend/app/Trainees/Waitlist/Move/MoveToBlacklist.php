<?php

namespace App\Trainees\Waitlist\Move;

use Exception;
use App\Models\Trainee;
use App\Traits\GetList;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;
use App\Trainees\Helpers\ListChangerHelper;

class MoveToBlacklist extends Permissions
{
    use ListChangerHelper, GetList, SendNotification;
    
    public function __construct(?Trainee $trainee, $id)
    {
        Gate::authorize('moveWaitToBlack', $trainee->find($id));

        $this->list = 'Blacklist';
        
        $this->list_name = 'blacklist';

        $this->current_user = auth()->user();
    }

    public function move(?Trainee $trainee, $id)
    {
        try
        {   
            $message = $this->listChanger($trainee->find($id), $this);

            $this->notifyUser('has moved a trainee from wait list to blacklist', $this->current_user, 'move_trainee_from_wait_to_blacklist');
            
            return $message;
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The trainee cannot be moved. Please contact the administrator of the website."], 400);
        }
    }
}