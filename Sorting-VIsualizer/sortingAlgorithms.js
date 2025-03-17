export class SortingAlgorithms {
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    bubbleSort(arr) {
        let swaps = [];
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    swaps.push({ firstPostion: j, lastPosition: j + 1 });
                }
            }
        }
        return swaps;
    }

    selectionSort(arr) {
        let swaps = [];
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                swaps.push({ firstPostion: i, lastPosition: minIdx });
            }
        }
        return swaps;
    }

    insertionSort(arr) {
        let swaps = [];
        let n = arr.length;
        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                swaps.push({ firstPostion: j + 1, lastPosition: j });
                j = j - 1;
            }
            arr[j + 1] = key;
        }
        return swaps;
    }

    mergeSort(arr) {
        let swaps = [];
        
        function merge(arr, l, m, r) {
            let left = arr.slice(l, m + 1);
            let right = arr.slice(m + 1, r + 1);
            let i = 0, j = 0, k = l;
            while (i < left.length && j < right.length) {
                if (left[i] <= right[j]) {
                    arr[k] = left[i];
                    i++;
                } else {
                    arr[k] = right[j];
                    swaps.push({ firstPostion: k, lastPosition: m + 1 + j });
                    j++;
                }
                k++;
            }
            while (i < left.length) {
                arr[k] = left[i];
                i++;
                k++;
            }
            while (j < right.length) {
                arr[k] = right[j];
                j++;
                k++;
            }
        }

        function mergeSortRecursive(arr, l, r) {
            if (l >= r) return;
            let m = Math.floor((l + r) / 2);
            mergeSortRecursive(arr, l, m);
            mergeSortRecursive(arr, m + 1, r);
            merge(arr, l, m, r);
        }

        mergeSortRecursive(arr, 0, arr.length - 1);
        return swaps;
    }

    quickSort(arr) {
        let swaps = [];

        function partition(low, high) {
            let pivot = arr[high];
            let i = low - 1;

            for (let j = low; j < high; j++) {
                if (arr[j] < pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    swaps.push({ firstPostion: i, lastPosition: j });
                }
            }
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            swaps.push({ firstPostion: i + 1, lastPosition: high });

            return i + 1;
        }

        function quickSortHelper(low, high) {
            if (low < high) {
                let pi = partition(low, high);
                quickSortHelper(low, pi - 1);
                quickSortHelper(pi + 1, high);
            }
        }

        quickSortHelper(0, arr.length - 1);
        return swaps;
    }
}
