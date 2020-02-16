package com.telran;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

//@CrossOrigin
@RestController
public class PersonController {

    //вместо базы данных
    private static AtomicLong idCounter = new AtomicLong(); //0

    //copy on write array list - dedicated for multithreading operations
    private static List<Person> personList = new CopyOnWriteArrayList<>();

    static {
        personList.add(Person.builder().id(idCounter.incrementAndGet()).firstName("John").lastName("Doe").build());
        personList.add(Person.builder().id(idCounter.incrementAndGet()).firstName("Anna").lastName("Stone").build());
        personList.add(Person.builder().id(idCounter.incrementAndGet()).firstName("Peter").lastName("Smith").build());
        personList.add(Person.builder().id(idCounter.incrementAndGet()).firstName("Simon").lastName("Java").build());
    }
    //вместо базы данных

    //thread safe


    @PostMapping("/persons")
    public Person save(@RequestBody Person person) {
        person.setId(idCounter.incrementAndGet());
        personList.add(person);

        return person;
    }

    @GetMapping("/persons") //20 threads
    public List<Person> getAll() {
        return personList;
    }
}


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
class Person {
    private Long id;
    private String firstName;
    private String lastName;
}