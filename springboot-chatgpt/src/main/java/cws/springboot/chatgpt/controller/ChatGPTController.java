package cws.springboot.chatgpt.controller;

import cws.springboot.chatgpt.dto.PromptRequest;
import cws.springboot.chatgpt.services.ChatGPTService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/chat")
public class ChatGPTController {

    private final ChatGPTService chatGPTService;

    public ChatGPTController(ChatGPTService chatGPTService) {
        this.chatGPTService = chatGPTService;
    }

    @PostMapping
    public String chat(@RequestBody PromptRequest promptRequest){
//        System.out.println("In Chat() : "+promptRequest);
//        String res= chatGPTService.getChatGPTResponse(promptRequest);
//        System.out.println("RES ChatGPTController----: "+res);
//        return res.toString();
        return chatGPTService.getChatGPTResponse(promptRequest);
    }

}
