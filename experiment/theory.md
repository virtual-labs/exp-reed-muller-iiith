### Monomials and Polynomials over $\mathbb{F}_2$

A monomial is an algebraic expression that consists of a single product of variables. For our purposes, we are interested in monomials with $m$ variables, $X_1, X_2, \dots, X_m$, where each variable can only be present or absent. This is because we operate in the binary field $\mathbb{F}_2$, where any variable $X_i$ squared is just itself ($X_i^2 = X_i$). Thus, a monomial can be written as:
$$ M = X*{j_1} X*{j*2} \dots X*{j_d} \tag{1}$$
where $\{j_1, j_2, \dots, j_d\}$ is a subset of the variable indices $\{1, 2, \dots, m\}$. The number of variables that are multiplied together in the monomial (i.e., $d$, in the above monomial) is the **degree** of the monomial.

A **Boolean polynomial** is a sum of such monomials, with coefficients also from $\mathbb{F}_2$ (meaning, they are either 0 or 1). An example of a polynomial in four variables is:
$$ f(X_1, X_2, X_3, X_4) = 1 + X_1 + X_3 + X_1X_2 + X_2X_3X_4 \tag{2}$$
The **degree of a polynomial** is the highest degree among all of its monomials. In the example above, the monomial $X_2X_3X_4$ has degree 3, which is the highest, so the polynomial has degree 3.

### The Evaluation of a Polynomial

The core operation for constructing Reed-Muller codes is the evaluation of a polynomial. Given a polynomial $f(X_1, \dots, X_m)$ and a specific binary vector $\mathbf{v} = (v_1, v_2, \dots, v_m) \in \mathbb{F}_2^m$, we can evaluate the polynomial by substituting the components of $\mathbf{v}$ for the variables $X_i$.
$$ \text{Eval}\_{\mathbf{v}}(f) = f(v_1, v_2, \dots, v_m) \tag{3}$$
The result of this evaluation will be either 0 or 1.

The complete **evaluation vector** of a polynomial, denoted $\text{Eval}(f)$, is the ordered list of its evaluations for every single possible input vector in $\mathbb{F}_2^m$. Since there are $2^m$ such vectors, the evaluation vector will have a length of $n=2^m$. We conventionally list the evaluations by taking the input vectors $\mathbf{v} \in \mathbb{F}_2^m$ in lexicographical order (i.e., treating them as binary numbers from 0 to $2^m-1$).

#### Example: Evaluation of a Polynomial

Let's consider the polynomial $f(X_1, X_2, X_3) = X_1 + X_2X_3$ over $\mathbb{F}_2^3$. Its degree is 2. To find its evaluation vector, we compute its value for all $2^3 = 8$ input vectors, from $(0,0,0)$ to $(1,1,1)$.

| Input Vector $(v_1, v_2, v_3)$ in lexicographic order | Calculation of $f(v_1, v_2, v_3) = v_1 + v_2v_3$ | Output |
| :---------------------------------------------------: | :----------------------------------------------- | :----: |
|                       $(0,0,0)$                       | $0 + (0 \cdot 0) = 0 + 0$                        | **0**  |
|                       $(0,0,1)$                       | $0 + (0 \cdot 1) = 0 + 0$                        | **0**  |
|                       $(0,1,0)$                       | $0 + (1 \cdot 0) = 0 + 0$                        | **0**  |
|                       $(0,1,1)$                       | $0 + (1 \cdot 1) = 0 + 1$                        | **1**  |
|                       $(1,0,0)$                       | $1 + (0 \cdot 0) = 1 + 0$                        | **1**  |
|                       $(1,0,1)$                       | $1 + (0 \cdot 1) = 1 + 0$                        | **1**  |
|                       $(1,1,0)$                       | $1 + (1 \cdot 0) = 1 + 0$                        | **1**  |
|                       $(1,1,1)$                       | $1 + (1 \cdot 1) = 1 + 1$                        | **0**  |

Assembling these output bits in order gives us the evaluation vector:
$$ \text{Eval}(X_1 + X_2X_3) = (0, 0, 0, 1, 1, 1, 1, 0) \tag{4}$$

### Reed-Muller Codes

Reed-Muller (RM) codes are a family of linear block codes specified by two parameters: $m$ and $r$, denoted as $RM(r, m)$.

- The parameter $m$ determines the number of variables in our polynomials, which in turn sets the codeword length to $n = 2^m$.
- The parameter $r$ (where $0 \le r \le m$) specifies the maximum allowable degree for our polynomials.

The code $RM(r, m)$ is then formally defined as the set of all evaluation vectors of all possible Boolean polynomials in $m$ variables having a degree of at most $r$.

The number of distinct monomials of degree up to $r$ determines the dimension of the code, $k$. Specifically, the message bits we wish to encode correspond to the coefficients of these monomials. The dimension is thus $k = \sum_{j=0}^{r} \binom{m}{j}$.

### Encoding of RM Codes

Apart from a standard generator matrix multiplication (which shall be discussed in the another experiment), the encoding process for $RM(r, m)$ maps a message to a polynomial, and then generates the codeword by evaluating that polynomial.

1.  **Construct the Polynomial:** Use the message bits as the coefficients for the set of allowed monomials (all those with degree $\le r$) to form a message polynomial $f(X_1, \dots, X_m)$.
2.  **Generate the Codeword:** Compute the evaluation vector $\text{Eval}(f)$ by evaluating the polynomial for all $2^m$ input vectors in $\mathbb{F}_2^m$. This evaluation vector is the final codeword $\mathbf{c}$.

#### Example 1: Encoding for $RM(1, 3)$

Let's encode a message using the $RM(1, 3)$ code.

- Parameters: $m=3, r=1$.
- Codeword length: $n = 2^3 = 8$.
- Allowed monomials: Degree $\le 1$. These are $\{1, X_1, X_2, X_3\}$.
- Dimension: $k = \binom{3}{0} + \binom{3}{1} = 1 + 3 = 4$.

Suppose our message is $\mathbf{u} = (1, 1, 0, 1)$. We map these bits to the coefficients of the allowed monomials in a fixed order (e.g., constant, then $X_1$, $X_2$, $X_3$):
$$ f(X_1, X_2, X_3) = (1) \cdot 1 + (1) \cdot X_1 + (0) \cdot X_2 + (1) \cdot X_3 = 1 + X_1 + X_3 \tag{5}$$
Now, we generate the 8-bit codeword by evaluating this polynomial:

| Input $(v_1, v_2, v_3)$ | $f(v_1, v_2, v_3) = 1 + v_1 + v_3$ | Output |
| :---------------------: | :--------------------------------: | :----: |
|        $(0,0,0)$        |              $1+0+0$               | **1**  |
|        $(0,0,1)$        |              $1+0+1$               | **0**  |
|        $(0,1,0)$        |              $1+0+0$               | **1**  |
|        $(0,1,1)$        |              $1+0+1$               | **0**  |
|        $(1,0,0)$        |              $1+1+0$               | **0**  |
|        $(1,0,1)$        |              $1+1+1$               | **1**  |
|        $(1,1,0)$        |              $1+1+0$               | **0**  |
|        $(1,1,1)$        |              $1+1+1$               | **1**  |

The resulting codeword for the message $(1, 1, 0, 1)$ is $\mathbf{c} = (1, 0, 1, 0, 0, 1, 0, 1)$.

#### Example 2: Encoding for $RM(2, 4)$

Let's examine a more complex example. Consider the $RM(2, 4)$ code.

- Parameters: $m=4, r=2$.
- Codeword length: $n = 2^4 = 16$.
- Allowed monomials: All monomials with degree 0, 1, or 2. This includes $1$, $\{X_1, X_2, X_3, X_4\}$, and $\{X_1X_2, X_1X_3, X_1X_4, X_2X_3, X_2X_4, X_3X_4\}$.
- Dimension: $k = \binom{4}{0} + \binom{4}{1} + \binom{4}{2} = 1 + 4 + 6 = 11$.

Let's say our 11-bit message corresponds to a message polynomial $f(X_1, X_2, X_3, X_4) = X_1X_2 + X_3$. This is a valid polynomial because its degree is 2, which is $\le r$.

To find the codeword, we must evaluate this polynomial for all 16 input vectors from $(0,0,0,0)$ to $(1,1,1,1)$.

- For input $(0,0,0,0)$: $f(0,0,0,0) = (0 \cdot 0) + 0 = 0$.
- For input $(0,0,0,1)$: $f(0,0,0,1) = (0 \cdot 0) + 0 = 0$. This is incorrect. $f(0,0,0,1) = (0 \cdot 0) + 0 = 0$ is wrong, it should be $f(0,0,0,1) = 0 \cdot 0 + 0 = 0$ which is correct. The next one is $f(0,0,1,0) = 0 \cdot 0 + 1 = 1$. Let me re-evaluate the calculation in the previous turn.

Let's re-calculate for $f(X_1, X_2, X_3, X_4) = X_1X_2 + X_3$.
The evaluation depends on the values of $X_1, X_2$ and $X_3$.
The input vectors are $(v_1, v_2, v_3, v_4)$.

- If $v_1=0, v_2=0$: $F = 0 \cdot 0 + v_3 = v_3$. For inputs $(0000, 0001, 0010, 0011)$, $v_3$ is $(0,0,1,1)$. So outputs are $(0,0,1,1)$.
- If $v_1=0, v_2=1$: $F = 0 \cdot 1 + v_3 = v_3$. For inputs $(0100, 0101, 0110, 0111)$, $v_3$ is $(0,0,1,1)$. So outputs are $(0,0,1,1)$.
- If $v_1=1, v_2=0$: $F = 1 \cdot 0 + v_3 = v_3$. For inputs $(1000, 1001, 1010, 1011)$, $v_3$ is $(0,0,1,1)$. So outputs are $(0,0,1,1)$.
- If $v_1=1, v_2=1$: $F = 1 \cdot 1 + v_3 = 1+v_3$. For inputs $(1100, 1101, 1110, 1111)$, $v_3$ is $(0,0,1,1)$. So outputs are $(1+0, 1+0, 1+1, 1+1) = (1,1,0,0)$.

Concatenating these blocks gives the full 16-bit codeword:
$$ \mathbf{c} = (0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0) \tag{6}$$
This vector is one of the valid codewords in the $RM(2, 4)$ code space.
