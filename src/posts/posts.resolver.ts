import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service'; // Import your service
import { deleteResponse, Post } from './entities/post.entity'; // Import your entity
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) { }

  @Query(() => [Post])
  async allPosts() {
    try {
      const data: any = await this.postsService.findAll();
      return data;
    } catch (error) {
      throw error;
    }
  }

  @Query(() => Post)
  async post(@Args('id') id: string) {
    try {
      const data: any = await this.postsService.findPostById(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => Post)
  async createPost(@Args('inputs') input: CreatePostInput) {
    try {
      const postInfo = await this.postsService.createPost(input);
      return postInfo;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('id') id: string,
    @Args('input') input: UpdatePostInput,
  ) {
    try {
      const updatedPost = await this.postsService.updatePost(id, input);
      return updatedPost;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => deleteResponse)
  async deletePost(@Args('id') id: string) {
    try {
      await this.postsService.deletePost(id);
      return { message: 'Delete successfully' };
    } catch (error) {
      throw error;
    }
  }
}
