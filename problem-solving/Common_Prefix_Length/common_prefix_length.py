def commonPrefix(inputs):
    input_list = list(inputs[0])
    input_str = inputs[0]
    prefix = ''
    result = [len(input_str)]
    while input_list:
        prefix += input_list.pop(0)
        current = input_str[len(prefix):]
        if current.startswith(prefix):
            result.append(len(prefix))
        else:
            result.append(0)
    result.pop()
    return result
