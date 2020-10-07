import { createConnection } from "typeorm";
import { Post } from "./entity/Post";
import { Category } from "./entity/Category";

// connection settings are in the "ormconfig.json" file
createConnection()
  .then(async (connection) => {
    const category1 = new Category();
    category1.name = "TypeScript";
    await connection.manager.save(category1);

    const category2 = new Category();
    category2.name = "Programming";
    await connection.manager.save(category2);

    const post = new Post();
    post.title = "Control flow based type analysis";
    post.text = "TypeScript 4.0 is awesome";
    post.categories = [category1, category2];
    await connection.manager.save(post);

    const categories = await connection.manager.find(Category);
    console.log(categories);
    const posts = await connection.manager.find(Post);
    console.log(posts);
  })
  .catch((error) => console.log("Error: ", error));
