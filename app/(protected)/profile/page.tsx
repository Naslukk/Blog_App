import {
  Edit,
  Heart,
  LogOut,
  MessageCircle,
  Pencil,
  Trash2,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { logout } from "@/actions/auth";
import { verifySession } from "@/lib/session";

export default async function Profile() {

    const user = await verifySession();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="container mx-auto max-w-5xl py-10 px-4">

      {/* Profile */}

      <Card>
        <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 py-8">

          <div className="flex items-center gap-5">

            <Avatar className="h-24 w-24">
              <AvatarImage src="" />
              <AvatarFallback>NK</AvatarFallback>
            </Avatar>

            <div>

              <h1 className="text-3xl font-bold">
                Naslu KK
              </h1>

              <p className="text-muted-foreground">
                Full Stack Developer
              </p>

              <p className="text-sm text-muted-foreground mt-1">
                naslu@example.com
              </p>

              <Badge className="mt-3">
                Author
              </Badge>

            </div>

          </div>

          <div className="flex gap-3">

            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>

            <form action={logout}>
              <Button
                variant="outline"
                type="submit"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </form>

          </div>

        </CardContent>
      </Card>

      {/* Stats */}

      <div className="grid grid-cols-3 gap-5 mt-8">

        <Card>
          <CardContent className="py-6 text-center">

            <h2 className="text-3xl font-bold">
              12
            </h2>

            <p className="text-muted-foreground">
              Posts
            </p>

          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-6 text-center">

            <h2 className="text-3xl font-bold">
              240
            </h2>

            <p className="text-muted-foreground">
              Likes
            </p>

          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-6 text-center">

            <h2 className="text-3xl font-bold">
              87
            </h2>

            <p className="text-muted-foreground">
              Comments
            </p>

          </CardContent>
        </Card>

      </div>

      <Separator className="my-10" />

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          My Blogs
        </h2>

        <Button>
          Create Blog
        </Button>

      </div>

      <div className="grid gap-6 mt-6">

        {[1,2,3].map((blog)=>(
          <Card key={blog}>

            <CardContent className="p-6">

              <div className="flex flex-col md:flex-row gap-5">

                <div className="h-40 w-full md:w-60 rounded-lg bg-muted" />

                <div className="flex-1">

                  <h3 className="text-xl font-semibold">
                    Building a Blog App with Next.js
                  </h3>

                  <p className="text-muted-foreground mt-2">
                    Learn how to build a complete blog
                    application using Next.js, Prisma,
                    PostgreSQL and Shadcn UI.
                  </p>

                  <div className="flex gap-6 mt-5 text-muted-foreground">

                    <span className="flex items-center gap-2">
                      <Heart size={18}/>
                      34
                    </span>

                    <span className="flex items-center gap-2">
                      <MessageCircle size={18}/>
                      10
                    </span>

                  </div>

                </div>

                <div className="flex md:flex-col gap-2">

                  <Button size="icon">
                    <Pencil size={18}/>
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                  >
                    <Trash2 size={18}/>
                  </Button>

                </div>

              </div>

            </CardContent>

          </Card>
        ))}

      </div>

    </main>
  );
}