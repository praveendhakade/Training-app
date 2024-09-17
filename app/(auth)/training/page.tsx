import { verifyAuth } from "@/lib/auth";
import { getTrainings } from "@/lib/training";
import { ITraining } from "@/models/training";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function TrainingPage() {
  const result = await verifyAuth();

  if (!result.user) {
    return redirect("/");
  }
  const trainingSessions = getTrainings();
  return (
    <main>
      <h1>Find your favorite activity</h1>
      <ul id="training-sessions">
        {(trainingSessions as ITraining[]).map((training: ITraining) => (
          <li key={training.id} className="relative h-24 w-32">
            <Image
              src={`/trainings${training.image}`}
              alt={training.title}
              fill
            />
            <div>
              <h2>{training.title}</h2>
              <p>{training.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
