import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service'; // Import your service
import { Post } from './entities/post.entity'; // Import your entity
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) { }

  @Query(() => [Post])
  posts() {
    return this.postsService.findAll();
  }

  @Mutation(() => Post)
  async createPost(
    @Args('inputs') input: CreatePostInput,
  ) {
    try {
      const postInfo = await this.postsService.createPost(input)
      return postInfo;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('id') id: string,
    @Args('input') input: UpdatePostInput,
  ): Promise<Post> {
    try {
      const updatedPost = await this.postsService.updatePost(id, input);
      return updatedPost;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('id') id: string): Promise<boolean> {
    await this.postsService.deletePost(id);
    return true;
  }
}
