package cws.springboot.chatgpt.services;

import cws.springboot.chatgpt.dto.ChatGPTRequest;
import cws.springboot.chatgpt.dto.ChatGPTResponse;
import cws.springboot.chatgpt.dto.PromptRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class ChatGPTService {

    private final RestClient restClient;

    @Autowired // You can ignore this because of only once constructor is defined here
    public ChatGPTService(RestClient restClient) {
        this.restClient = restClient;
    }

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.model}")
    private String model;

    public String getChatGPTResponse(PromptRequest promptRequest){
//        System.out.println("in getChatGPTResponse() .......:"+promptRequest+"\n apiKey:"+apiKey);
        ChatGPTRequest chatGPTRequest = new ChatGPTRequest(
                model, List.of(new ChatGPTRequest.Message("user", promptRequest.prompt())));

        ChatGPTResponse response = restClient.post()
                .header("Authorization", "Bearer "+apiKey)
                .header("Content-Type", "application/json")
                .body(chatGPTRequest)
                .retrieve()
                .body(ChatGPTResponse.class);

        String retRes = response.choices().get(0).message().content();
//        System.out.println("Service... response: "+retRes);
//        return  retRes;
        return response.choices().get(0).message().content();

    }

}
