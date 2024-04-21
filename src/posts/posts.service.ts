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

  createPost(
    title: string,
    content: string,
    category: string,
    tags: string[],
    published: boolean
  ) {
    const post = this.postsRepository.create({
      title,
      content,
      category,
      tags,
      published,
    });

    return this.postsRepository.save(post);
  }


  async deletePost(id: any): Promise<Post> {
    const post = await this.postsRepository.findOneBy(id);
    console.log("the post is", post)
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return this.postsRepository.remove(post);
  }

}
