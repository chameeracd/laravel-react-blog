<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBlogPostRequest;
use App\Http\Requests\UpdateBlogPostRequest;
use App\Http\Resources\BlogPostResource;
use App\Models\BlogPost;
use Illuminate\Http\Response;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class BlogPostController extends Controller
{
    use AuthorizesRequests;

    public function __construct()
    {
        $this->authorizeResource(BlogPost::class, 'blog_post');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return BlogPostResource::collection(
            BlogPost::query()->orderBy('id', 'desc')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlogPostRequest $request)
    {
        $data = $request->validated();
        $blogPost = BlogPost::create($data);

        if ($request->hasFile('image')) {
            $blogPost->addMediaFromRequest('image')->toMediaCollection('images');
        }

        return response(new BlogPostResource($blogPost), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(BlogPost $blogPost)
    {
        return new BlogPostResource($blogPost);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlogPostRequest $request, BlogPost $blogPost)
    {
        $data = $request->validated();
        $blogPost->update($data);

        if ($request->hasFile('image')) {
            $blogPost->clearMediaCollection('images');
            $blogPost->addMediaFromRequest('image')->toMediaCollection('images');
        }

        return new BlogPostResource($blogPost);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BlogPost $blogPost)
    {
        $blogPost->delete();

        return response('', Response::HTTP_NO_CONTENT);
    }
}
