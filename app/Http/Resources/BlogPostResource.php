<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class BlogPostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'image' => $this->getFirstMedia('images'),
            'created' => Carbon::parse($this->created_at)->diffForHumans(),
            'created_at' => Carbon::parse($this->created_at)->toDayDateTimeString(),
            'created_by' => $this->createdBy->name,
        ];
    }
}
