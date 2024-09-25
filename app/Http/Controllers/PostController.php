<?php

namespace App\Http\Controllers;

use App\Http\Resources\BlogPostResource;
use App\Models\BlogPost;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return BlogPostResource::collection(BlogPost::query()->orderBy('created_at', 'desc')->paginate(env("PAGE_SIZE", 9)));
    }
}
