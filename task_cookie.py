Задача 1. Офисные печеньки

Разработчик Фёдор очень любит печеньки в офисе, и точно знает все N мест, где их можно найти, а также точное количество печенек Сn в каждом месте. Сегодня Фёдор особенно голоден: он закончил большую задачу, и решает выделить себе M часов на то, чтобы съесть все печеньки в офисе.

Фёдор рассчитал минимальное количество печенек K, которое ему нужно съедать в течение часа так, чтобы в итоге успеть съесть все печеньки в офисе за выделенное время.

В каждый час, он может посетить одно любое место с печеньками и съесть K печенек в этом месте, он потратит на это целый час, даже если в этом месте осталось меньше, чем K печенек, потому что будет обсуждать с коллегами задачи и планы.

Коллеги, из уважения к Фёдору, никогда не трогают его любимые печеньки.

Ваша задача – найти минимально возможное K. Если Фёдор не успеет съесть все печеньки, или в офисе нет печенек – нужно вывести 0.

Пример:

3 6
4
4
5


<script>
    const lab = [[0, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0]];
    waveAlg(lab, 4, 4, 0, 0)
    function waveAlg(Arr, sx, sy, ex, ey) {
        let iter = 2; let exit = false
        for (let i = 1; i < Arr.length - 1; i++) {
            for (let j = 1; j < Arr[0].length - 1; j++) {
                if (sx + i == ex && sy + j == ey) { exit = true; break }
                if (sx - i == ex && sy - j == ey) { exit = true; break }
                if (sx + i == ex && sy - j == ey) { exit = true; break }
                if (sx - i == ex && sy + j == ey) { exit = true; break }
                if (sx + i < Arr.length && Arr[sx + i][sy + j] == 0) Arr[sx + i][sy + j] = iter
                if (sx - i >= 0 && Arr[sx - i][sy - j] == 0) Arr[sx - i][sy - j] = iter
                if (sx + i < Arr.length && Arr[sx + i][sy - j] == 0) Arr[sx + i][sy - j] = iter
                if (sx - i >= 0 && Arr[sx - i][sy + j] == 0) Arr[sx - i][sy + j] = iter
                iter++
            }
            if (exit) break;
        }
        console.log(exit)
        console.log(iter)
        console.log(Arr)
        let exx = ex, eyy = ey
        let result = []
        for (let i = iter - 1; i >= 0; i--) {
            if (Arr[exx + 1][eyy] == iter) result.push([exx + 1, eyy])
            if (Arr[exx - 1][eyy] == iter) result.push([exx - 1, eyy])
            if (Arr[exx][eyy + 1] == iter) result.push([exx, eyy + 1])
            if (Arr[exx][eyy - 1] == iter) result.push([exx, eyy - 1])
        }
    }

    function time_check(cookies, time_check, time) {
        let time_ret = 0
        for (let i = 0; i < cookies.length; i++) time_ret += Math.ceil(cookies[i] / time_check)
        return time_ret <= time
    }
    function bin_check(cookies, time) {
        let start = 1
        let end = cookies[cookies.length]
        while (start < end) {
            const middle = Math.ceil((start + end) / 2)
            if (time_check(cookies, middle, time)) {
                end -= middle + 1
            } else {
                start += middle + 1
            }
        }
        return start
    }
</script>
