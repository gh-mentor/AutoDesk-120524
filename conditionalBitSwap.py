"""
This module contains demonstrates the use of byte arrays and conditional bit swapping using bit masks.
"""

"""
Generate a function 'conditional_bit_swap' that takes in 3 arguments:
- 'arr1': an array of bytes
- 'arr2': an array of bytes 
- 'm': a one-byte bit mask.

Implementation details:
- the swaps the bits in the same positions of the elements of two byte arrays, but only if the corresponding bit in the mask is set and the bits to be swapped are different.
- the conditional_bit_swap function should not return anything.
Exception handling:
- check that the arr1 and arr2 are the same size and raise an exception if not.
Example:
    arr1 = [0b00001010, 0b00001100]
    arr2 = [0b00000110, 0b00000011]
    m = 0b1010

    After calling conditional_bit_swap(arr1, arr2, m), arr1 and arr2 should be:
    arr1 = [0b00000010, 0b00000110]
    arr2 = [0b00001110, 0b00001001]
"""
def conditional_bit_swap(arr1, arr2, m):
    if len(arr1) != len(arr2):
        raise Exception("Arrays are not the same size")
    for i in range(len(arr1)):
        for j in range(8):
            if m & (1 << j):
                if (arr1[i] & (1 << j)) != (arr2[i] & (1 << j)):
                    arr1[i] ^= (1 << j)
                    arr2[i] ^= (1 << j)

"""
Create a function 'conditional_bit_swap_test' that will test the 'conditional_bit_swap' function.
Details:
- use the assert statement to check the correctness of the function.
- print "All test cases pass" if the function works correctly.
Use the following test cases:
- arr1 = [0b00001010, 0b00001100], arr2 = [0b00000110, 0b00000011], m = 0b1010
"""
def conditional_bit_swap_test():
    arr1 = [0b00001010, 0b00001100]
    arr2 = [0b00000110, 0b00000011]
    m = 0b1010
    conditional_bit_swap(arr1, arr2, m)
    assert arr1 == [0b00000010, 0b00000110]
    assert arr2 == [0b00001110, 0b00001001]
    print("All test cases pass")

# The main function will call the conditional_bit_swap_test function.
def main():
    conditional_bit_swap_test()

if __name__ == '__main__':
    main()

