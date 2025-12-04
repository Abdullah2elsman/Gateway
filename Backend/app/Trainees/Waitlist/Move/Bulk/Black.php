<?php

namespace App\Trainees\Waitlist\Move\Bulk;

use Exception;
use App\Models\Trainee;
use App\Traits\GetList;
use App\Traits\BulkHelper;
use App\Permissions\Permissions;
use App\Traits\SendNotification;
use Illuminate\Support\Facades\Gate;
use App\Trainees\Helpers\ListChangerHelper;

class Black extends Permissions
{
    use ListChangerHelper, GetList, BulkHelper, SendNotification;
    
    public function __construct($current_user)
    {
        $this->current_user = $current_user;

        $this->list = 'Blacklist';

        $this->list_name = 'blacklist';

        $this->permission = 'moveWaitToBlack';
    }

    public function move(?Trainee $trainee, $request)
    {
        try
        {   
            $this->Authorized($trainee, $request->trainees, $this);
            
            foreach($request->trainees as $trainee_id)
            {
                $this->listChanger($trainee->find($trainee_id), $this);
            }

            $this->notifyUser('has moved trainees from wait list to blacklist', $this->current_user, 'move_trainee_from_wait_to_blacklist');
            
            return response(['message' => "Trainees move to ".$this->list_name." Successfully."], 201);
        }
        catch(Exception $e)
        {
            return response(['message' => "Something went wrong. The trainee cannot be moved. Please contact the administrator of the website."], 400);
        }
    }
}