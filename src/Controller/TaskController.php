<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Repository\TaskRepository;
use App\Entity\User;
use App\Entity\Task;
use Doctrine\Persistence\ManagerRegistry;
use DateTime;
use DateTimeZone;


#[Route('/api')]
class TaskController extends AbstractController
{
    #[Route('/tasks', name: 'app_task_index')]
    public function index(TaskRepository $taskRepository): Response
    {
        $tasks = $taskRepository->findAll();

        $taskJSON = [];

        foreach($tasks as $task) {
            $taskJSON[] = array(
                'id'=> $task->getId(),
                'title' => $task->getTitle(),
                'importance' => $task->getImportance(),
                'date'=>$task->getDate()->format("d-m-Y H:i"),
                'author' => $task->getAuthor()->getId(),
            );
        }

        return new JsonResponse($taskJSON);
    }

    #[Route('/tasks/new', name: 'app_task_new', methods:['POST'])]
    public function new(Request $request, ManagerRegistry $doctrine): Response
    {   
        $entityManager=$doctrine->getManager();
        $parameters = json_decode($request->getContent(), true);

        $task = Task::createTask($parameters["id"],$parameters["title"],$parameters["importance"],new DateTime('now', new DateTimezone('Europe/Madrid')),$this->getUser());
        $entityManager->persist($task);
        $entityManager->flush();

        $response = new Response();
        $response->setStatusCode(Response::HTTP_OK);

        return $response;
    }

    #[Route('/tasks/delete/{id}', name: 'app_task_delete', methods:['POST'])]
    public function delete(Request $request, ManagerRegistry $doctrine,int $id): Response
    {
        $response = new Response();

        $entityManager=$doctrine->getManager();
        if($task = $entityManager->getRepository(Task::class)->find($id)){
            $entityManager->remove($task);
            $entityManager->flush();

            $response->setStatusCode(Response::HTTP_OK);
        } else {
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
        return $response;
    }
    
    #[Route('/tasks/edit/{id}', name: 'app_task_edit', methods:['PUT'])]
    public function edit(Request $request, ManagerRegistry $doctrine, int $id): Response
    {       
        $response = new Response();

        $entityManager=$doctrine->getManager();

        if($task = $entityManager->getRepository(Task::class)->find($id)){

            $parameters = json_decode($request->getContent(), true);
            $task->setImportance($parameters["importance"]);
            $task->setTitle($parameters["title"]);

            $entityManager->flush();

            $response->setStatusCode(Response::HTTP_OK);
        } 

        return $response;
    }

}
