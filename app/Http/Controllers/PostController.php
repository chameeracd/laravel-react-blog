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
        $posts = BlogPost::query()->orderBy('id', 'desc')->paginate(3);
        return BlogPostResource::collection($posts);
    }
}
