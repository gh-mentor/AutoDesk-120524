/*
Include header files to let us work with input and output objects, threads, promises, time, function objects, and random numbers.
*/

#include <iostream>
#include <thread>
#include <chrono>
#include <functional>
#include <random>

/*
Create a lambda function named 'job' that simulates a workload.
Arguments:
- 'workload': an integer representing the number of steps in the workload
Returns: void
Details:
- Use a 'for loop' to to simulate a workload by iterating from the given workload value down to 1. 
- For each iteration, it performs the following steps:
    1) Generates a random sleep time between 0.5 and 1.5 seconds.
    2) Pauses the execution for the generated sleep time.
    3) Prints a message indicating the completion of the current step.
Example:
job(10);
*/
std::function<void(int)> job = [](int workload) {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_real_distribution<> dis(0.5, 1.5);

    for (int i = workload; i > 0; --i) {
        double sleep_time = dis(gen);
        std::this_thread::sleep_for(std::chrono::milliseconds(static_cast<int>(sleep_time * 1000)));
        std::cout << "Step " << i << " completed." << std::endl;
    }
};

int main()
{
    const int steps = 10;
    job(steps);
    return 0;
}

