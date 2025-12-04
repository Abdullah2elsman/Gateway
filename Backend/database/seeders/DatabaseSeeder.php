<?php

namespace Database\Seeders;

use App\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Branch;
use App\Models\GtList;
use App\Models\Permission;
use Illuminate\Database\Seeder;
use App\Permissions\Permissions;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    
    public function run(): void
    {
        // $permissions = new Permissions();

        // $branch = Branch::create([
        //     'country' => 'Egypt',
        //     'city' => 'Giza',
        //     'district' => 'Dokki'
        // ]);

        // Branch::create([
        //     'country' => 'Egypt',
        //     'city' => 'Cairo',
        //     'district' => 'Nasr City'
        // ]);

        // GtList::create([
        //     'list_title' => 'Wait List'
        // ]);

        // GtList::create([
        //     'list_title' => 'Pending List'
        // ]);

        // GtList::create([
        //     'list_title' => 'Hold List'
        // ]);

        // GtList::create([
        //     'list_title' => 'Refund List'
        // ]);

        // GtList::create([
        //     'list_title' => 'Blacklist'
        // ]);

        // $role = Role::create([
        //     'role' => 'Trainer'
        // ]);
        
        // foreach($permissions->permission as $collection_key => $per_collection)
        // {
            // foreach($per_collection as $per_key => $per_value)
            // {
            //     is_string($per_key) ? $key = $per_key :  $key = $per_value; 
                
            //     Permission::create([
            //         'role_id' => $role->id,
            //         'per_collection' => $collection_key,
            //         'per_key' => $key,
            //         'per_value' => true
            //     ]);
            // }
        // }
        
        // User::create([
        //     'user_id' => 2424,
        //     'email' => 'cairoadmin@gatewaycommunity.net',
        //     'password' => Hash::make('CairoAdmin@123'),
        //     'branch_id' => 2424,
        //     'role_id' => 2431,
        //     'full_name' => 'Cairo Admin',
        //     'is_activated' => true,
        // ]);
        User::create([
            'user_id' => 2425,
            'email' => 'gizaadmin@gatewaycommunity.net',
            'password' => Hash::make('gizaadmin@123'),
            'branch_id' => 2423,
            'role_id' => 2431,
            'full_name' => 'Cairo Admin',
            'is_activated' => true,
        ]);

        // User::create([
        //     'branch_id' => $branch->id,
        //     'role_id' => $role->id,
        //     'full_name' => 'Mohamed Karbawy',
        //     'email' => 'mohamed@gatewaycommunity.net',
        //     'password' => Hash::make('Mido@2000'),
        //     'is_activated' => true,
        // ]);

        // User::create([
        //     'branch_id' => $branch->id,
        //     'role_id' => $role->id,
        //     'full_name' => 'Yousef',
        //     'email' => 'yousef@gatewaycommunity.net',
        //     'password' => Hash::make('Yousef@123'),
        //     'is_activated' => true,
        // ]);
    }
}