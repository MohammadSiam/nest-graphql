import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) { }

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  async createPost(
    createPostInput: CreatePostInput
  ) {
    const post = this.postsRepository.create(createPostInput);
    return this.postsRepository.save(post);
  }

  async updatePost(id: string, input: UpdatePostInput): Promise<Post> {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) {
      throw new Error('Post not found');
    }

    // Update the post entity with values from the input
    if (input.title !== undefined) {
      post.title = input.title;
    }
    if (input.content !== undefined) {
      post.content = input.content;
    }
    if (input.category !== undefined) {
      post.category = input.category;
    }
    if (input.tags !== undefined) {
      post.tags = input.tags;
    }
    if (input.published !== undefined) {
      post.published = input.published;
    }

    // Save the updated post entity
    return this.postsRepository.save(post);
  }

  async deletePost(id: string) {
    const post: any = await this.postsRepository.find({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    try {
      const postInfo = await this.postsRepository.delete(post)
      if (!postInfo) throw new NotFoundException('could not delete post');
      return postInfo;
    } catch (error) {
      throw error;
    }
  }

}
