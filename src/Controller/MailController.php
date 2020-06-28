<?php


namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class MailController extends AbstractController
{
    /**
     * @Route("/sendMail", name="app_sendmail", methods="POST")
     */
    public function sendMail(Request $request, \Swift_Mailer $mailer) {
        dump($request);

        $name = $request->query->get('name');
        $email = $request->query->get('email');
        $phone = $request->query->get('phone');
        $message = $request->query->get('message');

        dump($name, $email, $phone, $message);

        if($name == "" || $email == "" || $phone == "" || $message == "") {
            return $this->json(['success' => 0]);
        }

        $new_message = (new \Swift_Message('Hello Email'))
            ->setFrom('contact.thomas.bisson@gmail.com')
            ->setTo('contact.thomas.bisson@gmail.com')
            ->setBody(
                'Mail from : ' . $name . ', email : ' . $email . ', phone : ' . $phone . ', message : ' . $message
            )
        ;
        $mailer->send($new_message);

        return $this->json(['success' => 1]);
    }
}