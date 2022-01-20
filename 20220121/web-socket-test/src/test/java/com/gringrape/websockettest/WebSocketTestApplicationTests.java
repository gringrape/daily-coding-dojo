package com.gringrape.websockettest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

import static org.assertj.core.api.Assertions.assertThat;

class WebSocketTestApplicationTests {
    StandardWebSocketClient client;
    TestHandler testHandler;

    final String endPoint = "ws://localhost:8080";

    @BeforeEach
    void setup() {
        client = new StandardWebSocketClient();
        testHandler = new TestHandler();
    }

    @Test
    void testConnection() throws ExecutionException, InterruptedException {
        WebSocketSession clientSession = client
                .doHandshake(testHandler, endPoint)
                .get();

        assertThat(clientSession.isOpen()).isTrue();
    }

    @Test
    void testSendMessage() throws ExecutionException, InterruptedException, IOException {
        WebSocketSession clientSession = client
                .doHandshake(testHandler, endPoint)
                .get();

        clientSession.sendMessage(new TextMessage("Jin".getBytes()));

        Thread.sleep(500);

        assertThat(testHandler.serverMessage).isEqualTo("Hello, Jin!");
    }

    private static class TestHandler extends TextWebSocketHandler {
        String serverMessage;

        @Override
        public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
            this.serverMessage = message.getPayload();
        }
    }
}
