package microservices.book.multiplication.challenge;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import microservices.book.multiplication.user.User;
import microservices.book.multiplication.user.UserController;
import microservices.book.multiplication.user.UserRepository;

import static org.assertj.core.api.BDDAssertions.then;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@ExtendWith(SpringExtension.class)
@AutoConfigureJsonTesters
@WebMvcTest(UserController.class)
public class UserControllerTest {
    @MockBean
    private UserRepository userRepository;

    @Autowired
    private MockMvc mvc;

    @Autowired
    private JacksonTester<List<User>> jsonRequestUser;

    @Test
    public void getUserIds() throws Exception {
        // given
        User user1 = new User(1L, "jane");
        User user2 = new User(2L, "john");
        given(userRepository.findAllByIdIn(List.of(1L, 2L)))
                .willReturn(List.of(user1, user2));

        // when
        MockHttpServletResponse response = mvc.perform(get("/users/1,2"))
                .andReturn().getResponse();

        // then
        then(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        then(response.getContentAsString()).isEqualTo(
                jsonRequestUser.write(
                        List.of(user1, user2)
                ).getJson());
    }
}
