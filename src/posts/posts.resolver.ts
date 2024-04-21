import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service'; // Import your service
import { Post } from './entities/post.entity'; // Import your entity

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) { }

  @Query(() => [Post])
  posts() {
    return this.postsService.findAll();
  }

  @Mutation(() => Post)
  async createPost(
    @Args('title') title: string,
    @Args('content') content: string,
    @Args('category') category: string,
    @Args('tags', { type: () => [String] }) tags: string[],
    @Args('published') published: boolean
  ) {
    return this.postsService.createPost(title, content, category, tags, published);
  }

  @Mutation(() => Post)
  async deletePost(@Args('id') id: string) {
    const deletedPost = await this.postsService.deletePost(id);
    console.log("the post is")
    return deletedPost;
  }
}
