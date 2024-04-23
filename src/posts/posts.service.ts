import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
  ) {}

  async findAll(): Promise<Post[]> {
    try {
      const postInfo = await this.postsRepository.find();
      if (postInfo.length === 0) throw new NotFoundException('No post found');
      return postInfo;
    } catch (error) {
      throw error;
    }
  }

  async findPostById(id: string) {
    try {
      const postInfo = await this.postsRepository.findOneBy({ id });
      return postInfo;
    } catch (error) {
      throw error;
    }
  }

  async createPost(createPostInput: CreatePostInput) {
    if (!createPostInput.title || !createPostInput.content)
      throw new BadRequestException('Post title and content are required');
    try {
      const postInfo = this.postsRepository.save({ ...createPostInput });
      if (!postInfo)
        throw new InternalServerErrorException('Could not create Post');
      return postInfo;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(id: string, input: UpdatePostInput) {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) {
      throw new Error('Post not found');
    }
    try {
      const postInfo = await this.postsRepository.save({
        ...post,
        ...input,
      });
      return postInfo;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(id: string) {
    const post: any = await this.postsRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    try {
      const postInfo = await this.postsRepository.delete(post.id);
      if (!postInfo) throw new NotFoundException('could not delete post');
      return postInfo;
    } catch (error) {
      throw error;
    }
  }
}
